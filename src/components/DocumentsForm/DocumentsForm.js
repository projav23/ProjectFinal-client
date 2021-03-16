import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { getFile } from "../../service/documents.service";

function DocumentsForm({ onSubmit, isRedirect }) {
  const { spaceId } = useParams();
  const [state, setState] = React.useState({ name: "", type:'' });
  const [imageReady, setImageReady] = React.useState(false);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleUpload = async (e) => {
    setImageReady(false);
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0]);
    const { data } = await getFile(spaceId, uploadData);
    console.log("document", data);
    setState({ ...state, urlFile: data });
    setImageReady(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // parserToArray()
    console.log("state enviado", state);
    onSubmit(state);
  };

  return (
    <>
      {isRedirect ? <Redirect to={`/spaces/${spaceId}/documents/`} /> : null}
      <form className="form-space" onSubmit={handleSubmit} id="form">
        <label>
          Nombre del documento*
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Seleccionar documento
          <input
            type="file"
            name="image"
            value={state.image}
            onChange={handleUpload}
          />
        </label>
        <label>
          Tipo de documento
          <select onChange={handleChange}  name="type">
            <option selected="true" disabled="disabled">
              Seleccionar tipo
            </option>
            <option value='imagen'>Imagen</option>
            <option value='excel'>Excel</option>
            <option value='word'>Word</option>
            <option value='powerpoint'>PowerPoint</option>
            <option value='pdf'>PDF</option>
            <option value='csv'>CSV</option>
          </select>
        </label>
      </form>

      <button form="form" type="submit" disabled={!imageReady}>
        Subir documento
      </button>
    </>
  );
}

export default DocumentsForm;
