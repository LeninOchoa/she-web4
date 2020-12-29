import printJS from 'print-js'

export function PrintImages(src) {
  printJS({
    printable: [src],
    type: 'image',
    imageStyle: 'width:90%;margin-bottom:20px;',
  })
}
