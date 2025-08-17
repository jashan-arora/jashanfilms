import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getCompanyInfo, addContactSubmission, type CompanyInfo } from "@/lib/firestore";
import { Send, Phone, Mail, MapPin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  serviceType: z.string().min(1, "Service type is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const queryClient = useQueryClient();
  
  const { data: companyInfo, isLoading: infoLoading } = useQuery<CompanyInfo | null>({
    queryKey: ["company-info"],
    queryFn: getCompanyInfo,
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await addContactSubmission(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
      toast({
        title: "Message Sent!",
        description: "Thank you for your submission! We will contact you soon.",
      });
      form.reset();
      setTermsAccepted(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(data);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-punjabi-cream to-punjabi-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-poppins font-bold text-punjabi-dark mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Submit your songs for TV broadcast or inquire about our advertising services
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-poppins font-semibold text-punjabi-dark mb-6">Contact Form</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 XXXXX XXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="song-submission">Song Submission</SelectItem>
                            <SelectItem value="advertisement">Advertisement Inquiry</SelectItem>
                            <SelectItem value="collaboration">Collaboration</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your requirements..." 
                            className="resize-none"
                            rows={5}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={termsAccepted}
                      onCheckedChange={setTermsAccepted}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-punjabi-orange hover:underline">
                        terms and conditions
                      </a>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full bg-punjabi-orange text-white hover:bg-punjabi-red font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={contactMutation.isPending}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {contactMutation.isPending ? "Sending..." : "Submit Request"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-poppins font-semibold text-punjabi-dark mb-6">Contact Information</h3>
                {infoLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center">
                        <Skeleton className="w-12 h-12 rounded-lg mr-4" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-32 mb-1" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-punjabi-orange/10 rounded-lg flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-punjabi-orange" />
                      </div>
                      <div>
                        <p className="font-medium text-punjabi-dark">{companyInfo?.phone}</p>
                        <p className="text-gray-600 text-sm">Call us for immediate assistance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-punjabi-orange/10 rounded-lg flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-punjabi-orange" />
                      </div>
                      <div>
                        <p className="font-medium text-punjabi-dark">{companyInfo?.email}</p>
                        <p className="text-gray-600 text-sm">Send us an email</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-punjabi-orange/10 rounded-lg flex items-center justify-center mr-4">
                        <MapPin className="h-5 w-5 text-punjabi-orange" />
                      </div>
                      <div>
                        <p className="font-medium text-punjabi-dark">{companyInfo?.address}</p>
                        <p className="text-gray-600 text-sm">Our production studio</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Promotional section */}
            <div 
              className="bg-cover bg-center rounded-xl h-64 flex items-end p-8"
              style={{
                backgroundImage: "linear-gradient(45deg, rgba(255, 107, 53, 0.8), rgba(185, 28, 28, 0.8)), url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600')"
              }}
            >
              <div className="text-white">
                <h4 className="text-xl font-poppins font-semibold mb-2">Ready to Showcase Your Talent?</h4>
                <p className="text-white/90">Join hundreds of artists who have featured on Doordarshan through Jashan Films.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
