import "./ChatCard.scss";

export default function ChatCard() {
  return (
    <div className="chat-uwu">
      <div className="chat-header">
        <span className="chat-avatar">
          <i className="icon-user"></i>
        </span>
        <span className="chat-title">Chat con Odontólogo</span>
        <div className="chat-actions">
          <i className="icon-bell"></i>
          <i className="icon-settings"></i>
        </div>
      </div>

      <div className="chat-body">
        <div className="chat-message chat-message--other">
          <div className="chat-card">
            <div className="chat-card-img">
              {/* Puedes poner aquí un SVG o imagen de ejemplo */}
              <svg width="60" height="60">
                <rect
                  x="5"
                  y="5"
                  width="20"
                  height="20"
                  rx="6"
                  fill="#e3d9ef"
                />
                <circle cx="45" cy="20" r="12" fill="#e3d9ef" />
                <polygon points="35,50 55,55 45,35" fill="#e3d9ef" />
              </svg>
            </div>
            <div className="chat-card-info">
              <div className="chat-card-title">Homemade Dumplings</div>
              <div className="chat-card-link">everydumplingeever.com</div>
            </div>
          </div>
          <div className="chat-bubble chat-bubble--dark">
            or we could make this?
          </div>
        </div>

        <div className="chat-message chat-message--me">
          <div className="chat-bubble">that looks so good!</div>
        </div>

        <div className="chat-suggestions">
          <button>Let's do it</button>
          <button>Great!</button>
          <button>Great!</button>
        </div>
      </div>

      <div className="chat-input-bar">
        <button className="chat-btn">
          <i className="icon-plus"></i>
        </button>
        <button className="chat-btn">
          <i className="icon-emoji"></i>
        </button>
        <input className="chat-input" placeholder="Type a message..." />
        <button className="chat-btn">
          <i className="icon-menu"></i>
        </button>
        <button className="chat-btn chat-btn--search">
          <i className="icon-search"></i>
        </button>
      </div>
    </div>
  );
}
