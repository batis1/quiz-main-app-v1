// // client
// // src/components/Upload.js

// import React, { Component } from "react";
// // import trackService from "../trackService";

// class Upload extends Component {
//   state = {
//     file: null,
//     url: undefined,
//   };

//   // File input handler //
//   ///////////////////////
//   fileOnChange = (event) => {
//     const file = event.target.files[0];
//     const fd = new FormData();
//     fd.append("file", file);
//     trackService.getUrl(fd).then((fileUrl) => {
//       this.setState({ url: fileUrl });
//     });
//   };

//   render() {
//     return (
//       <div>
//         <h1>Upload Track</h1>

//         <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
//           <label>File</label>
//           <input type="file" name="url" onChange={this.fileOnChange} />
//         </form>
//       </div>
//     );
//   }
// }

// export default Upload;
