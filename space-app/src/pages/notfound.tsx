import { PageTitle, PageDescription, PageDivider} from "@/components/ui/page";



export default function NotFound() {
    return (
        <div>
            <PageTitle>404 - Page Not Found</PageTitle>\
            <PageDescription>Oops! The page you are looking for does not exist.</PageDescription>
            <PageDivider />
        </div>
    );
}