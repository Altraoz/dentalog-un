import Cookies from "js-cookie";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { url_backend } from "../../api/variables";

const { Dragger } = Upload;

interface NewEvolutionProps {
  patient: { id: number; name: string; age: string; gender: string };
  setImagesInfo?: (newImageId: string) => void;
}
export const DraggItem: React.FC<NewEvolutionProps> = ({
  patient,
  setImagesInfo,
}) => {
  const csrftoken = Cookies.get("csrftoken");
  const { user } = useAuth();
  const url = url_backend + "/clinical/upload_medical_files/";
  const props: UploadProps = {
    name: "file",
    multiple: false,
    action: url,
    headers: {
      Authorization: `Token ${user?.token}`,
      "X-CSRFToken": csrftoken || "",
    },
    data: {
      patient: patient.id,
    },
    onChange(info) {
      console.log(patient.id);
      const { status } = info.file;
      if (status === "done") {
        const response = info.file.response;
        console.log("sending_response form dragger", response.image_url);
        // Usa image_url directamente
        if (setImagesInfo && response && response.image_url) {
          setImagesInfo(response.image_url);
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    // {
    //     "id": 11,
    //     "evolution": null,
    //     "patient": 17,
    //     "image_url": "url",
    //     "created_at": "2025-07-23T01:24:06.884557Z"
    // }
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props} maxCount={1}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};
