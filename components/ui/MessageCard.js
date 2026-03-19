const MessageCard = ({ message, onMessageDelete }) => (
  <div className="p-4 border rounded shadow-sm bg-gray-50">
    <p className="mb-2">{message.content}</p>
    <small className="text-gray-500">
      {message.createdAt
        ? new Date(message.createdAt).toLocaleString()
        : "No timestamp"}
    </small>
    <button
      className="ml-2 text-red-500 hover:text-red-700"
      onClick={() => onMessageDelete(message._id)}
    >
      ✕
    </button>
  </div>
);

export default MessageCard;