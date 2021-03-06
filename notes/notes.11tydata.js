const {titleCase} = require("title-case");
const path = require("path");

module.exports = {
    layout: "note.html",
    type: "note",
    eleventyComputed: {
        title: data => titleCase(data.title || data.page.fileSlug),
        backlinks: (data) => {
            const notes = data.collections.notes;
            const currentFileUrl = data.page.url;

            const stripYaml = (content) => {
                if(content.startsWith("---")) {
                    return content.substr(content.indexOf("---", 3) + 3);
                } else {
                    return content;
                }
            }

            // Search each note for backlinks
            return notes.filter(n => {
                // Only fetch backlinks
                const noteContent = stripYaml(n.template.inputContent);

                // This regex finds all wikilinks in the note
                const linksInNote = (noteContent.match(
                    /\[\[([\w\s/-]+)(.\w+)?(\|([\w\s/]+))?\]\]/g
                ) || [])
                .map(m => (
                    // Extract link location
                    "/notes/" + m.slice(2,-2).split("|")[0] + "/"
                ));

                return linksInNote.includes(currentFileUrl);
            }).map(n => {
                // Construct return object
                const noteContent = stripYaml(n.template.inputContent);
                
                return {
                    url: n.url,
                    title: n.data.title || titleCase(path.basename(n.filePathStem)),
                    preview: noteContent
                }
            })
        }
    }
}