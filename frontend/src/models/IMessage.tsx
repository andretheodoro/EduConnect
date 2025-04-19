import User from "./IUser";

interface IMessage {
    id?: string;
    title: string;
    content: string;
    senderId: string;
    sender?: { email: string };
    recipients?: User[];
    createdAt?: string;
    readBy: string[];
    isRead: boolean;
}

export default IMessage;