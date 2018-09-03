
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState  } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class EditorHelper {

    getEditorState() {
        return EditorState;
    }

    getComponent() {
        return Editor;
    }

    toHTML(editorState) {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }

    toDraft(content) {
        const blocksFromHtml = htmlToDraft(content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState); 
        return editorState;   
    }

}

export default new EditorHelper();