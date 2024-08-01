import { Error } from "../../types/Error";

import './ErrorNotification.scss'

interface Props {
  error: Error;
}

function ErrorNotification({ error }: Props) {
  return (<div className="error-notification">
    <p className="error-notification__message small-text">{error}</p>
  </div>)
}

export default ErrorNotification;
