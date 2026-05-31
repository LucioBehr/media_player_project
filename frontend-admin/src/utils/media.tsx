import type { MediaType } from "../types/media";
import {FileImageOutlined, PlayCircleOutlined} from "@ant-design/icons";

function getMediaTypeLabel(type: MediaType) {
    return type === "image" ? "Imagem" : "Vídeo";
  }
  
  function getMediaTypeIcon(type: MediaType) {
    return type === "image" ? <FileImageOutlined /> : <PlayCircleOutlined />;
  }

  export {getMediaTypeLabel, getMediaTypeIcon}