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
  spyFcmToken: string;
  country: string;
  city: string;
  mobile: string;
  connectionsType: string;
  _id: string;
}
