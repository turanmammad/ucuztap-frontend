import { Link } from "react-router-dom";

const AuthHeader = () => (
  <header className="border-b border-border bg-background">
    <div className="container flex items-center justify-center py-4">
      <Link to="/" className="text-xl font-extrabold tracking-tight">
        <span className="text-foreground">ucuz</span>
        <span className="text-primary">tap</span>
        <span className="text-muted-foreground">.az</span>
      </Link>
    </div>
  </header>
);

export default AuthHeader;
