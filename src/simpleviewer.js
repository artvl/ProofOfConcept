/* Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';


if (!PDFJS.PDFViewer || !PDFJS.getDocument) {
  alert('Please build the pdfjs-dist library using\n' +
        '  `gulp dist`');
}

// The workerSrc property shall be specified.
//
PDFJS.workerSrc = '/scripts/pdfjs-dist/build/pdf.worker.js';

// Some PDFs need external cmaps.
//
// PDFJS.cMapUrl = '../../build/dist/cmaps/';
// PDFJS.cMapPacked = true;

var DEFAULT_URL = '/src/unsound-oopsla16.pdf';
var SEARCH_FOR = ''; // try 'Mozilla';

var container = document.getElementById('viewerContainer');

// (Optionally) enable hyperlinks within PDF files.
var pdfLinkService = new PDFJS.PDFLinkService();

var pdfViewer = new PDFJS.PDFViewer({
  container: container,
  linkService: pdfLinkService,
});
pdfLinkService.setViewer(pdfViewer);

// (Optionally) enable find controller.
var pdfFindController = new PDFJS.PDFFindController({
  pdfViewer: pdfViewer
});
pdfViewer.setFindController(pdfFindController);



container.addEventListener('pagechange', function (evt, a) {
  // alert(evt)
  // var num = evt.pageNumber
  // alert("aa " + num);

});

container.addEventListener('pagesinit', function () {
  // We can use pdfViewer now, e.g. let's change default scale.
  // pdfViewer.currentScaleValue = 'page-width';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://localhost:8088/mailto', false ); // false for synchronous request
    xmlHttp.send( null );
    console.log("Sended mail")
  // pdfViewer.eventBus
  // pdfViewer.currentPageNumber
  // if (SEARCH_FOR) { // We can try search for things
  //   pdfFindController.executeCommand('find', {query: SEARCH_FOR});
  // }
});

// Loading document.
PDFJS.getDocument(DEFAULT_URL).then(function (pdfDocument) {
  // Document loaded, specifying document for the viewer and
  // the (optional) linkService.
  pdfViewer.setDocument(pdfDocument);

  pdfLinkService.setDocument(pdfDocument, null);
});
