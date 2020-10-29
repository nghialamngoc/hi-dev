import React, { useRef } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../EditorToolbar";
import "react-quill/dist/quill.snow.css";

export const Editor = () => {
  const [state, setState] = React.useState({ value: null });
  const quillEl = useRef(null);
  const handleChange = (value) => {
    setState({ value });
  };
  async function uploadImage(event) {
    const form = new FormData();
    form.append("upload_file", event.target.files[0]);
    const addImageRange = quillEl.current.editor.getSelection();
    const newRange = 0 + (addImageRange !== null ? addImageRange.index : 0);
    quillEl.current.editor.insertEmbed(
      newRange,
      "image",
      "https://dummyimage.com/600x400/000/fff"
    );
    quillEl.current.editor.setSelection(1 + newRange);
  }
  return (
    <div className="text-editor">
      {state.value}
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        ref={quillEl}
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
      <input
        type="file"
        id="uploadImg"
        style={{ display: "none" }}
        accept="image/png, image/jpeg, image/gif"
        onChange={uploadImage}
      />
    </div>
  );
};

export default Editor;
