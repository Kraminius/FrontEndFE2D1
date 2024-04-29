import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error & { statusText?: string };
  console.error(error);

  return (
    <div id="error-page" className="error-page">
      <h1>Pokkers!</h1>
      <p>Beklager, en uforventet fejl opstod.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
