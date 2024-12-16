import { EventEmitter } from "events";

interface SlackEvent {
    type: string;
    text: string;
    user: string;
    client_msg_id?: string;
    suppress_notification?: boolean;
    team?: string;
    channel?: string;
    event_ts?: string;
    ts?: string;
    subtype?: string;
}

class Webhook extends EventEmitter {
    enventReceived(event: SlackEvent) {
        this.emit("slackMessage", event);
    }
}

export default new Webhook();
