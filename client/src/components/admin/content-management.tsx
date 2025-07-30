import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Edit, Eye } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { ContentEditor } from "./content-editor";

interface ContentPage {
  id: number;
  pageKey: string;
  title: string;
  content: any;
  isPublished: boolean;
  lastModified: string;
}

export default function ContentManagement() {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingPage, setEditingPage] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<ContentPage>>({});

  const { data: pages = [], isLoading } = useQuery<ContentPage[]>({
    queryKey: ["/api/content"],
    enabled: !!token,
  });

  const updatePageMutation = useMutation({
    mutationFn: async (data: { id: number; updates: Partial<ContentPage> }) => {
      const response = await fetch(`/api/content/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.updates),
      });
      if (!response.ok) throw new Error("Failed to update page");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      setEditingPage(null);
      setEditForm({});
      toast({
        title: "Success",
        description: "Page updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update page",
        variant: "destructive",
      });
    },
  });

  const startEdit = (page: ContentPage) => {
    setEditingPage(page.id);
    setEditForm({
      title: page.title,
      content: page.content,
      isPublished: page.isPublished,
    });
  };

  const saveEdit = (contentData: any) => {
    if (editingPage) {
      updatePageMutation.mutate({
        id: editingPage,
        updates: {
          ...editForm,
          content: JSON.stringify(contentData)
        },
      });
    }
  };

  const cancelEdit = () => {
    setEditingPage(null);
    setEditForm({});
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading content pages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h2>
      </div>

      <div className="grid gap-6">
        {pages?.map((page: ContentPage) => (
          editingPage === page.id ? (
            <ContentEditor
              key={page.id}
              pageKey={page.pageKey}
              title={page.title}
              content={page.content}
              onSave={saveEdit}
              onCancel={cancelEdit}
            />
          ) : (
            <Card key={page.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {page.title}
                      <Badge variant={page.isPublished ? "default" : "secondary"}>
                        {page.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Section: {page.pageKey.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} • 
                      Last modified: {new Date(page.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => startEdit(page)} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Content
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    This content controls the <strong>{page.pageKey.replace('-', ' ')}</strong> section of your website. 
                    Click "Edit Content" to make changes.
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        ))}
      </div>

      {(!pages || pages.length === 0) && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No content pages found. Content will appear here once pages are created.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}