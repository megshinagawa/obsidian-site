import MarkdownIt from 'markdown-it';
import frontMatter from 'front-matter';

// Initialize markdown-it with desired plugins
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});


// EXTRACT TAGS 
// Helper function to extract tag names from `[[tag]]` format
function extractTagsFromBrackets(tags) {
  return tags
    .map(tag => tag.toString().replace(/\[\[(.*?)\]\]/, '$1').trim()) // Strip the brackets and trim whitespace
    .filter(Boolean); // Remove empty strings
}


// Plugin to handle markdown checkboxes
md.use(function(md) {
  md.core.ruler.push('convert_checkboxes', function(state) {
    // Loop through all tokens in the state
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i];

      // Check if the token is a list item
      if (token.type === 'inline' && token.children) {
        const childToken = token.children[0];

        // Check if the child token is 'text' and contains a checkbox pattern
        if (childToken && childToken.type === 'text') {
          const content = childToken.content;

          // Find the list_item_open token to add the "todo" class
          const listItemToken = state.tokens[i - 2]; // Assumes "list_item_open" is just before "inline"

          // Replace "- [ ]" with unchecked checkbox and add class "todo"
          if (content.startsWith('[ ]')) {
            childToken.content = content.slice(3).trim(); // Remove the "[ ]" part
            const checkboxToken = new state.Token('html_inline', '', 0);
            checkboxToken.content = `<input type="checkbox" disabled> `;
            token.children.unshift(checkboxToken); // Insert checkbox at the beginning

            // Add the "todo" class to the list item
            if (listItemToken && listItemToken.type === 'list_item_open') {
              listItemToken.attrJoin('class', 'todo');
            }
          }

          // Replace "- [x]" with checked checkbox and add class "todo"
          else if (content.startsWith('[x]')) {
            childToken.content = content.slice(3).trim(); // Remove the "[x]" part
            const checkboxToken = new state.Token('html_inline', '', 0);
            checkboxToken.content = `<input type="checkbox" checked disabled> `;
            token.children.unshift(checkboxToken); // Insert checkbox at the beginning

            // Add the "todo" class to the list item
            if (listItemToken && listItemToken.type === 'list_item_open') {
              listItemToken.attrJoin('class', 'todo');
            }
          }
        }
      }
    }
  });
});




// Plugin to handle ![[image.png]] syntax for custom image rendering
md.use(function(md) {
  md.core.ruler.push('convert_image_syntax', function(state) {
    // Loop through all tokens in the state
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i];

      // Check if the token type is 'inline' (where text content is processed)
      if (token.type === 'inline') {
        // Loop through the children of the inline token
        for (let j = 0; j < token.children.length; j++) {
          const childToken = token.children[j];

          // Check if the child token type is 'text'
          if (childToken.type === 'text') {
            // Use regex to find ![[image.png]] syntax
            const imagePattern = /!\[\[(.*?)\]\]/g;
            const matches = childToken.content.match(imagePattern);

            if (matches) {
              // Create a new array to hold the modified children
              const newChildren = [];
              let lastIndex = 0;

              // Process each match found
              matches.forEach((match) => {
                const imageName = match.slice(3, -2).trim(); // Get the text between ![[ and ]]

                // Add the text before the image to the new children
                const index = childToken.content.indexOf(match, lastIndex);
                if (index > lastIndex) {
                  newChildren.push(new state.Token('text', '', 0));
                  newChildren[newChildren.length - 1].content = childToken.content.slice(lastIndex, index);
                }

                // Create the image token
                const imageToken = new state.Token('html_inline', '', 0);
                imageToken.content = `<img src="/${imageName}"/>`;

                // Push the image token to the new children
                newChildren.push(imageToken);

                // Update the last index to track the end of the current match
                lastIndex = index + match.length;
              });

              // Add the remaining text after the last image syntax to new children
              if (lastIndex < childToken.content.length) {
                newChildren.push(new state.Token('text', '', 0));
                newChildren[newChildren.length - 1].content = childToken.content.slice(lastIndex);
              }

              // Replace original children with the new ones
              token.children.splice(j, 1, ...newChildren);
            }
          }
        }
      }
    }
  });
});


// Custom plugin to insert topical tags as links at the top of the content
md.use(function(md) {
  md.core.ruler.push('insert_topicaltags', function(state) {
    // Check if tokens exist and are an array
    if (!state.tokens || !Array.isArray(state.tokens)) {
      // console.warn('No tokens available or tokens is not an array.');
      return; // Early exit if there are no tokens
    }

    if (state.env.topicaltags && state.env.topicaltags.length > 0) {
      // Ensure tags are formatted as an array
      const rawTags = Array.isArray(state.env.topicaltags) ? state.env.topicaltags : [state.env.topicaltags];

      // Extract the clean tag names
      const tags = extractTagsFromBrackets(rawTags);
      // console.log('Extracted Tags:', tags); // Debug log to check extracted tags

      if (tags.length > 0) { // Only proceed if there are valid tags
        // Create a new token for the paragraph containing the links
        const paragraphOpen = new state.Token('paragraph_open', 'p', 1);
        const paragraphContent = new state.Token('inline', '', 0);
        
        // **Add "Tags: " prefix**
        const prefixToken = new state.Token('text', '', 0);
        prefixToken.content = 'Tags: ';
        paragraphContent.children = [prefixToken]; // Start with the "Tags: " prefix


        // Create child tokens for each tag
        tags.forEach((tag, index) => {
          const linkToken = new state.Token('link_open', 'a', 1); // Opening <a> tag
          linkToken.attrs = [['href', `/tags/${tag}`]]; // Setting the href attribute
          
          const linkContentToken = new state.Token('text', '', 0); // Inline token for the link text
          linkContentToken.content = tag; // Set the link text (tag name)

          const linkCloseToken = new state.Token('link_close', 'a', -1); // Closing </a> tag

          // Push the tokens for the link into the paragraphContent's children
          paragraphContent.children.push(linkToken, linkContentToken, linkCloseToken);
          
          // Add a separator if it's not the last tag
          if (index < tags.length - 1) {
            const separator = new state.Token('text', '', 0);
            separator.content = ', '; // Space or any separator
            paragraphContent.children.push(separator);
          }
        });

        const paragraphClose = new state.Token('paragraph_close', 'p', -1);

        // // Debug: Log tokens to see the structure
        // console.log("Tokens before inserting topical tags:", state.tokens.map(t => ({ type: t.type, tag: t.tag })));

        // Find the index of the first H1 token
        const h1Index = state.tokens.findIndex(token => token.type === 'heading_open' && token.tag === 'h1');
        // console.log("First H1 index:", h1Index); // Debug: Log index of first H1

        // If an H1 was found, insert the tags after it
        if (h1Index !== -1) {
          state.tokens.splice(h1Index + 3, 0, paragraphOpen, paragraphContent, paragraphClose);
          // console.log("Tokens after inserting topical tags:", state.tokens.map(t => ({ type: t.type, tag: t.tag })));
        } else {
          console.warn("No H1 tag found to insert topical tags after.");
        }
      }
    }
  });
});



// EXTRACT HEADER 1 AS TITLE 

// Custom plugin to extract H1 as title without removing it from the content
md.use(function(md) {
  md.core.ruler.push('extract_h1_to_yaml', function(state) {
    let localTitle = '';  // Title is now local to each file
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i];

      // Check if the token is an h1 heading
      if (token.type === 'heading_open' && token.tag === 'h1') {
        const nextToken = state.tokens[i + 1]; // The inline content of the h1
        if (nextToken && nextToken.type === 'inline') {
          localTitle = nextToken.content;  // Extract the title text
        }
        // No need to remove tokens now, just extract the title
        break;
      }
    }
    // Store the title in the environment (state.env)
    state.env.title = localTitle;
  });
});



// PLUGIN TO HANDLE [[WIKILINKS]]
md.use(function(md) {
  md.core.ruler.push('wikilinks', function(state) {
    // Loop through all tokens in the state
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i];

      // Check if the token type is 'inline' (where text content is processed)
      if (token.type === 'inline') {
        // Loop through the children of the inline token
        for (let j = 0; j < token.children.length; j++) {
          const childToken = token.children[j];

          // Check if the child token type is 'text'
          if (childToken.type === 'text') {
            // Use regex to find [[wikilinks]] in the text
            const wikilinkPattern = /\[\[(.*?)\]\]/g;
            const matches = childToken.content.match(wikilinkPattern);

            if (matches) {
              // Create a new array to hold the modified children
              const newChildren = [];
              let lastIndex = 0;

              // Process each match found
              matches.forEach((match) => {
                const linkText = match.slice(2, -2).trim(); // Get the text between [[ and ]]
                
                // Add the text before the wikilink to the new children
                const index = childToken.content.indexOf(match, lastIndex);
                if (index > lastIndex) {
                  newChildren.push(new state.Token('text', '', 0, childToken.content.slice(lastIndex, index)));
                }

                // Create the link token
                const linkOpen = new state.Token('link_open', 'a', 1);
                linkOpen.attrs = [['href', `/${linkText}`]]; // Set the href for the link

                // Add the link text as a token
                const linkContent = new state.Token('text', '', 0);
                linkContent.content = linkText;

                const linkClose = new state.Token('link_close', 'a', -1); // Closing link token

                // Push the link tokens to the new children
                newChildren.push(linkOpen, linkContent, linkClose);

                // Update the last index to track the end of the current match
                lastIndex = index + match.length;
              });

              // Add the remaining text after the last wikilink to new children
              if (lastIndex < childToken.content.length) {
                newChildren.push(new state.Token('text', '', 0, childToken.content.slice(lastIndex)));
              }

              // Replace original children with the new ones
              token.children.splice(j, 1, ...newChildren);
            }
          }
        }
      }
    }
  });
});





// FUNCTION TO PROCESS MARKDOWN 
export function processMarkdown(content) {
  // Parse front matter and body
  const { body, attributes } = frontMatter(content);

  // Prepare the environment
  const env = {
    topicaltags: attributes.topicaltags || []
  };

  // Render the markdown body to HTML
  const html = md.render(body, env);  // Pass the env object to capture the title

 // If the front matter doesn't contain a title, use the extracted one
 if (!attributes.title && env.title) {
  attributes.title = env.title;
}

  // Return the rendered HTML along with any metadata
  return { html, metadata: attributes };
}

export default processMarkdown;
