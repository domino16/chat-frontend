import { rxStompConfig } from '../config/rx-stomp.config';
import { RxStompService } from './rx-stomp.service';



export function rxStompServiceFactory() {  
  // const rxStomp = new RxStompService();
  const rxStomp = new RxStompService()
  
  rxStomp.configure(rxStompConfig);
  rxStomp.activate();

  return rxStomp
}