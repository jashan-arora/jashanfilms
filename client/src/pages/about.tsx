import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCompanyInfo, type CompanyInfo } from "@/lib/firestore";

export default function About() {
  const { data: companyInfo, isLoading } = useQuery<CompanyInfo | null>({
    queryKey: ["company-info"],
    queryFn: getCompanyInfo,
  });

  if (isLoading) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Skeleton className="w-full h-96 rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!companyInfo) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-red-600">Unable to load company information</h2>
          <p className="text-gray-600 mt-2">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-poppins font-bold text-punjabi-dark mb-4">About Jashan Films</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading Punjabi music production company with official Doordarshan broadcasting license
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional music recording studio" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-poppins font-semibold text-punjabi-dark">Our Story</h3>
            <p className="text-gray-600 leading-relaxed">
              {companyInfo.description}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {companyInfo.mission}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <Card className="bg-punjabi-cream">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-punjabi-orange mb-2">
                    {companyInfo.showsProduced}
                  </div>
                  <div className="text-sm text-gray-600">Shows Produced</div>
                </CardContent>
              </Card>
              <Card className="bg-punjabi-cream">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-punjabi-orange mb-2">
                    {companyInfo.artistsFeatured}
                  </div>
                  <div className="text-sm text-gray-600">Artists Featured</div>
                </CardContent>
              </Card>
              <Card className="bg-punjabi-cream">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-punjabi-orange mb-2">
                    {companyInfo.yearsExperience}
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
