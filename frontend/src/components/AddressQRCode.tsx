import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface AddressQRCodeProps {
  address: string;
}

const AddressQRCode = ({ address }: AddressQRCodeProps) => {
  const uri = `ethereum:${address}`;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-4 bg-white rounded-lg flex flex-col items-center justify-center">
        <QRCodeSVG value={uri} size={160} level="H" />
      </div>
    </div>
  );
};

export default AddressQRCode;
