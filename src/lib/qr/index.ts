import QRCode from 'qrcode';

export const processQRCode = async (params: {
  address: string;
  uuid: string;
  issuer: string;
  createdAt: Date;
}) => {
  try {
    let qrData = await QRCode.toDataURL(JSON.stringify(params), {
      errorCorrectionLevel: 'H',
    });

    let data = qrData.split(',')[1];
    return Buffer.from(data, 'base64');
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const writeQRCode = async (
  target: string,
  params: {
    address: string;
    uuid: string;
    issuer: string;
    createdAt: Date;
  }
) => {
  return await QRCode.toFile(target, JSON.stringify(params), {
    errorCorrectionLevel: 'H',
  });
};
