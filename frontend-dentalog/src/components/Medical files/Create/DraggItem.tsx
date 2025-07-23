import Cookies from "js-cookie";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { url_backend } from "../../api/variables";

const { Dragger } = Upload;

export function DraggItem() {
  const csrftoken = Cookies.get("csrftoken");
  const { user } = useAuth();
  const url = url_backend + "/clinical/upload_images/";
  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: url,
    headers: {
      Authorization: `Token ${user?.token}`,
      "X-CSRFToken": csrftoken || "",
    },
    data: {
      evolution_id: 5, // o puedes hacerlo dinámico como una función
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
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
}
