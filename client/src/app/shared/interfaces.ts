export interface User {
  email: string;
  password: string;
}

export interface Device {
  deviceName: string;
  deviceId: string;
  ipAddress: string;
  platform: string;
  createdAt: string;
  fcmToken: string;
  country: string;
  city: string;
  _id: string;
}
