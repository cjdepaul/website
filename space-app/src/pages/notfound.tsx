import { PageTitle, PageDivider} from "@/components/ui/page";



export default function NotFound() {
    return (
        <div>
            <PageTitle>404 - Page Not Found</PageTitle>
            <PageDivider />
            <p className="text-center">Sorry, the page you are looking for does not exist.</p>
            <p className="text-center">Please check the URL or return to the homepage.</p>
        </div>
    );
}