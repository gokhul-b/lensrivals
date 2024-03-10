import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="border-b py-5 px-3">
      <header className="flex items-center justify-between">
        <div>
          <h1>Photograph Community</h1>
        </div>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
    </div>
  );
};

export default Header;
