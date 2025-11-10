import { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../styles/farmer/FarmerForm.css";

export const FileUploader = () => {
    const [fileList, setFileList] = useState<any[]>([]);

    const handleChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    };

    const handleBeforeUpload = (file: File) => {
        const isAllowed = file.type === "application/pdf" || file.type.startsWith("image/");
        if (!isAllowed) {
            message.error(`${file.name} فرمت پشتیبانی نشده است.`);
        }
        return isAllowed || Upload.LIST_IGNORE;
    };

    const handleRemove = (file: any) => {
        setFileList(fileList.filter(f => f.uid !== file.uid));
    };

    return (
        <div className="file-uploader">
            <Upload
                multiple
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={handleBeforeUpload}
                onRemove={handleRemove}
                listType="picture"
                className="custom-upload"
            >
                <Button icon={<UploadOutlined />} type="dashed" block>
                    کشیدن و رها کردن فایل‌ها یا کلیک برای انتخاب
                </Button>
            </Upload>
        </div>
    );
};
