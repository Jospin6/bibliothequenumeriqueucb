import {pdfjs} from 'react-pdf'

export const loadPdfWorker = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
}