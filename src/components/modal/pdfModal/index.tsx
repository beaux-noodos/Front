import { Modal } from "antd";

 

export const PdfModal = (props: { isVisible: any; onCancel: any; }) => {
  const { isVisible, onCancel } = props;

  const pdfUrl= "/contrat.pdf"
  return (
    <Modal
      title="Document PDF"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      width="75vw"
      centered
    >
      <iframe
        src={pdfUrl}
        style={{ width: "100%", height: "600px" }}
        title="PDF Viewer"
      />
    </Modal>
  );
};
