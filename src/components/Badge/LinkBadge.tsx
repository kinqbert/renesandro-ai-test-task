import "./LinkBadge.scss";

interface Props {
  badgeText: string;
  href: string;
}

function LinkBadge({ badgeText, href }: Props) {
  return (
    <div className="badge link-badge">
      <a className="badge__text link-badge__text" href={href}>
        {badgeText}
      </a>
    </div>
  );
}

export default LinkBadge;
