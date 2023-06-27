import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type DropzoneProps = {
    onFileChange: (file: File) => void;
};

type DropzonePreviewProps = {
    file: {
        url: string;
        preview?: string;
    };
};

const DropzonePreview: React.FC<DropzonePreviewProps> = ({ file }) => {
    const { url, preview } = file;

    if (!preview) {
        return null;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={preview} alt="Preview" style={{ maxHeight: '100px', maxWidth: '400px' }} />
        </div>
    );
};

const Dropzone: React.FC<DropzoneProps> = ({ onFileChange }) => {
    const [file, setFile] = useState<{ url: string; preview?: string }>({ url: '', preview: '' });

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const uploadedFile = acceptedFiles[0];
            const fileUrl = URL.createObjectURL(uploadedFile);
            setFile({ url: fileUrl, preview: fileUrl });
            onFileChange(uploadedFile);
        },
        [onFileChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        //accept: ['image/png', 'image/jpeg'],
        maxFiles: 1,
    });

    return (
        <div
            {...getRootProps()}
            style={{
                width: '600px',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                borderWidth: '2px',
                borderRadius: '2px',
                borderColor: '#eeeeee',
                borderStyle: 'dashed',
                backgroundColor: '#fafafa',
                color: '#bdbdbd',
                outline: 'none',
                transition: 'border .24s ease-in-out',
            }}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the file here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
            <DropzonePreview file={file} />
        </div>
    );
};

export default Dropzone;
