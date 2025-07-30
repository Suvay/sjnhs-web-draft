import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface Announcement {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  createdBy: number;
}

export default function AnnouncementManagement() {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingAnnouncement, setEditingAnnouncement] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Announcement>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    isPublished: true,
  });

  const { data: announcements = [], isLoading } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof newAnnouncement) => {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create announcement");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
      setIsDialogOpen(false);
      setNewAnnouncement({ title: "", content: "", isPublished: true });
      toast({
        title: "Success",
        description: "Announcement created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create announcement",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: number; updates: Partial<Announcement> }) => {
      const response = await fetch(`/api/announcements/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.updates),
      });
      if (!response.ok) throw new Error("Failed to update announcement");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
      setEditingAnnouncement(null);
      setEditForm({});
      toast({
        title: "Success",
        description: "Announcement updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update announcement",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/announcements/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete announcement");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
      toast({
        title: "Success",
        description: "Announcement deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete announcement",
        variant: "destructive",
      });
    },
  });

  const startEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement.id);
    setEditForm({
      title: announcement.title,
      content: announcement.content,
      isPublished: announcement.isPublished,
    });
  };

  const saveEdit = () => {
    if (editingAnnouncement) {
      updateMutation.mutate({
        id: editingAnnouncement,
        updates: editForm,
      });
    }
  };

  const cancelEdit = () => {
    setEditingAnnouncement(null);
    setEditForm({});
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading announcements...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Announcement Management</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Create and manage school news, updates, and important announcements
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-title">Title</Label>
                <Input
                  id="new-title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="Enter announcement title..."
                />
              </div>
              <div>
                <Label htmlFor="new-content">Content</Label>
                <Textarea
                  id="new-content"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  rows={6}
                  placeholder="Enter announcement content..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="new-published"
                  checked={newAnnouncement.isPublished}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, isPublished: e.target.checked })}
                />
                <Label htmlFor="new-published">Publish immediately</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => createMutation.mutate(newAnnouncement)}
                  disabled={!newAnnouncement.title.trim() || !newAnnouncement.content.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Create Announcement
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {announcements?.map((announcement: Announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {editingAnnouncement === announcement.id ? (
                    <Input
                      value={editForm.title || ""}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="text-xl font-bold mb-2"
                    />
                  ) : (
                    <CardTitle className="flex items-center gap-2">
                      {announcement.title}
                      <Badge variant={announcement.isPublished ? "default" : "secondary"}>
                        {announcement.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </CardTitle>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Created: {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {editingAnnouncement === announcement.id ? (
                    <>
                      <Button onClick={saveEdit} size="sm" className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={cancelEdit} variant="outline" size="sm">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => startEdit(announcement)} size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        onClick={() => deleteMutation.mutate(announcement.id)} 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingAnnouncement === announcement.id ? (
                <div className="space-y-4">
                  <Textarea
                    value={editForm.content || ""}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    rows={6}
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`published-${announcement.id}`}
                      checked={editForm.isPublished || false}
                      onChange={(e) => setEditForm({ ...editForm, isPublished: e.target.checked })}
                    />
                    <Label htmlFor={`published-${announcement.id}`}>Published</Label>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {announcement.content}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {(!announcements || announcements.length === 0) && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No announcements found. Click "New Announcement" to create your first one.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}