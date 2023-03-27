export enum MessageType {
    INFO = "info",
    ERROR = "error",
    NONE = "",
  }
  
  export const Message:React.FC<{
    type?: MessageType
  }> = ({children, type=MessageType.NONE}) => {
    return <div className={`message $(type)`}>{children}</div>;
  };