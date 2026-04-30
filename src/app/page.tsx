import RedirectClient from "./components/utility/RedirectClient";

export function generateStaticParams() {
    return [];
  }

export default function NoLocalePage() {
    return (<RedirectClient />);
}