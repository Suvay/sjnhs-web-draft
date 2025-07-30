import { useState } from "react";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Settings as SettingsIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface SiteSetting {
  id: number;
  key: string;
  value: string;
  description: string;
  lastModified: string;
}

export default function SiteSettings() {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const { data: siteSettings, isLoading } = useQuery({
    queryKey: ["/api/settings"],
    enabled: !!token,
  });

  // Update local settings when data changes
  React.useEffect(() => {
    if (siteSettings) {
      const settingsObj = siteSettings.reduce((acc: Record<string, string>, setting: SiteSetting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, string>);
      setSettings(settingsObj);
    }
  }, [siteSettings]);

  const updateMutation = useMutation({
    mutationFn: async (data: { key: string; value: string }) => {
      const response = await fetch(`/api/settings/${data.key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: data.value }),
      });
      if (!response.ok) throw new Error("Failed to update setting");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
      setIsSaving(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update settings",
        variant: "destructive",
      });
      setIsSaving(false);
    },
  });

  const handleSave = async () => {
    setIsSaving(true);
    
    // Update all settings
    const promises = Object.entries(settings).map(([key, value]) =>
      updateMutation.mutateAsync({ key, value })
    );

    try {
      await Promise.all(promises);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Site Settings</h2>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-title">Site Title</Label>
              <Input
                id="site-title"
                value={settings["site_title"] || "San Jose National High School"}
                onChange={(e) => updateSetting("site_title", e.target.value)}
                placeholder="Website title"
              />
            </div>
            
            <div>
              <Label htmlFor="site-description">Site Description</Label>
              <Textarea
                id="site-description"
                value={settings["site_description"] || "Excellence in education since 1971"}
                onChange={(e) => updateSetting("site_description", e.target.value)}
                placeholder="Brief description of the school"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="school-address">School Address</Label>
              <Textarea
                id="school-address"
                value={settings["school_address"] || "San Jose, Sto. Tomas, Batangas"}
                onChange={(e) => updateSetting("school_address", e.target.value)}
                placeholder="Complete school address"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input
                  id="contact-phone"
                  value={settings["contact_phone"] || ""}
                  onChange={(e) => updateSetting("contact_phone", e.target.value)}
                  placeholder="School phone number"
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Email Address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={settings["contact_email"] || ""}
                  onChange={(e) => updateSetting("contact_email", e.target.value)}
                  placeholder="School email address"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="office-hours">Office Hours</Label>
              <Input
                id="office-hours"
                value={settings["office_hours"] || "Monday - Friday, 7:00 AM - 5:00 PM"}
                onChange={(e) => updateSetting("office_hours", e.target.value)}
                placeholder="Office operating hours"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook-url">Facebook Page</Label>
                <Input
                  id="facebook-url"
                  value={settings["facebook_url"] || ""}
                  onChange={(e) => updateSetting("facebook_url", e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <Label htmlFor="youtube-url">YouTube Channel</Label>
                <Input
                  id="youtube-url"
                  value={settings["youtube_url"] || ""}
                  onChange={(e) => updateSetting("youtube_url", e.target.value)}
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrollment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="enrollment-status">Enrollment Status</Label>
              <Input
                id="enrollment-status"
                value={settings["enrollment_status"] || "Open"}
                onChange={(e) => updateSetting("enrollment_status", e.target.value)}
                placeholder="Current enrollment status"
              />
            </div>
            
            <div>
              <Label htmlFor="enrollment-message">Enrollment Message</Label>
              <Textarea
                id="enrollment-message"
                value={settings["enrollment_message"] || "Enrollment for School Year 2025-2026 is now open!"}
                onChange={(e) => updateSetting("enrollment_message", e.target.value)}
                placeholder="Message displayed on enrollment section"
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="enrollment-requirements">Enrollment Requirements</Label>
              <Textarea
                id="enrollment-requirements"
                value={settings["enrollment_requirements"] || "Birth Certificate, Form 138, Good Moral Certificate"}
                onChange={(e) => updateSetting("enrollment_requirements", e.target.value)}
                placeholder="Required documents for enrollment"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}