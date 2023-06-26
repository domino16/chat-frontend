import {RxStompConfig } from "@stomp/rx-stomp";

export const rxStompConfig: RxStompConfig = {
  // Which server?
  brokerURL: "ws://localhost:8081/ws",

  // Headers
  // Typical keys: login, passcode, host
  // connectHeaders: {
  //   Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRvbWlubzE2LTlAbzIucGwiLCJmaXJzdE5hbWUiOiJEb21pbmlrIiwibGFzdE5hbWUiOiJQaWV0cnp5ayIsImlhdCI6MTY4Njc1NTEwMiwiZXhwIjoxNjg2NzU4MTAyfQ.i0VljXGIhG9uj2j-LrZd3IDNYcXVuiU1jpZV2_RQ_hw'
  // },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 2000,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // beforeConnect: (stompClient: RxStomp): Promise<void> => {
  //   return new Promise<void>((resolve) => {
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) return;
  //     stompClient.stompClient.
  //     connectHeaders = {Authorization: `Bearer ${token}`};
  //     resolve();
  //   });
  // },
};
