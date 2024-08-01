import "./Badge.scss";

interface Props {
  badgeText: string;
}

function Badge({ badgeText }: Props) {
  return (
    <div className="badge">
      <span className="badge__text">{badgeText}</span>
    </div>
  );
}

export default Badge;
