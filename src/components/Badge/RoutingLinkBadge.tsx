import "./Badge.scss";
import "./RoutingLinkBadge.scss";
import { Link } from "react-router-dom";

interface Props {
  badgeText: string;
  to: string;
}

function RoutingLinkBadge({ badgeText, to }: Props) {
  return (
    <div className="badge routing-link-badge">
      <Link className="badge__text routing-link-badge__text" to={to}>
        {badgeText}
      </Link>
    </div>
  );
}

export default RoutingLinkBadge;
