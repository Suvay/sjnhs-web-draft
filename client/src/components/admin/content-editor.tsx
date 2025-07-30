import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X } from "lucide-react";

interface ContentEditorProps {
  pageKey: string;
  title: string;
  content: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function ContentEditor({ pageKey, title, content, onSave, onCancel }: ContentEditorProps) {
  const [formData, setFormData] = useState(() => {
    try {
      return typeof content === 'string' ? JSON.parse(content) : content;
    } catch {
      return {};
    }
  });

  const handleSave = () => {
    onSave(formData);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Render specific editor based on page key
  const renderEditor = () => {
    switch (pageKey) {
      case "home-hero":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Main Title</Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="San Jose National High School"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle || ""}
                onChange={(e) => updateField("subtitle", e.target.value)}
                placeholder="SOAR HIGH!"
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline || ""}
                onChange={(e) => updateField("tagline", e.target.value)}
                placeholder="San Jose High!"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="School description..."
                rows={3}
              />
            </div>
          </div>
        );

      case "about-overview":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mission">Mission Statement</Label>
              <Textarea
                id="mission"
                value={formData.mission || ""}
                onChange={(e) => updateField("mission", e.target.value)}
                placeholder="School mission..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="vision">Vision Statement</Label>
              <Textarea
                id="vision"
                value={formData.vision || ""}
                onChange={(e) => updateField("vision", e.target.value)}
                placeholder="School vision..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="history">School History</Label>
              <Textarea
                id="history"
                value={formData.history || ""}
                onChange={(e) => updateField("history", e.target.value)}
                placeholder="School history..."
                rows={4}
              />
            </div>
          </div>
        );

      case "enrollment-info":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="enrollmentPeriod">Enrollment Period</Label>
              <Input
                id="enrollmentPeriod"
                value={formData.enrollmentPeriod || ""}
                onChange={(e) => updateField("enrollmentPeriod", e.target.value)}
                placeholder="June 1 - August 31, 2025"
              />
            </div>
            <div>
              <Label htmlFor="requirements">Requirements (one per line)</Label>
              <Textarea
                id="requirements"
                value={Array.isArray(formData.requirements) ? formData.requirements.join('\n') : ""}
                onChange={(e) => updateField("requirements", e.target.value.split('\n').filter(line => line.trim()))}
                placeholder="Birth Certificate&#10;Form 138&#10;Good Moral Certificate"
                rows={6}
              />
            </div>
          </div>
        );

      default:
        return (
          <div>
            <Label htmlFor="content">Content (Advanced Mode)</Label>
            <Textarea
              id="content"
              value={JSON.stringify(formData, null, 2)}
              onChange={(e) => {
                try {
                  setFormData(JSON.parse(e.target.value));
                } catch {
                  // Invalid JSON, keep current state
                }
              }}
              rows={10}
              className="font-mono text-sm"
            />
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit: {title}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Make changes to the content below. Click Save to apply your changes to the website.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderEditor()}
        
        <div className="flex gap-2 pt-4 border-t">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button onClick={onCancel} variant="outline">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}