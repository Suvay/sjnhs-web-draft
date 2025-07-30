import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X, Calendar } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { format } from "date-fns";

interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  isPublished: boolean;
  createdAt: string;
  createdBy: number;
}

export default function EventManagement() {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingEvent, setEditingEvent] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Event>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    isPublished: true,
  });

  const { data: events, isLoading } = useQuery({
    queryKey: ["/api/events"],
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof newEvent) => {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create event");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setIsDialogOpen(false);
      setNewEvent({
        title: "",
        description: "",
        eventDate: "",
        location: "",
        isPublished: true,
      });
      toast({
        title: "Success",
        description: "Event created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create event",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: number; updates: Partial<Event> }) => {
      const response = await fetch(`/api/events/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.updates),
      });
      if (!response.ok) throw new Error("Failed to update event");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setEditingEvent(null);
      setEditForm({});
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update event",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete event");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete event",
        variant: "destructive",
      });
    },
  });

  const startEdit = (event: Event) => {
    setEditingEvent(event.id);
    setEditForm({
      ...event,
      eventDate: format(new Date(event.eventDate), "yyyy-MM-dd'T'HH:mm"),
    });
  };

  const saveEdit = () => {
    if (editingEvent) {
      updateMutation.mutate({
        id: editingEvent,
        updates: editForm,
      });
    }
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setEditForm({});
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Event Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-title">Event Title</Label>
                <Input
                  id="new-title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-date">Event Date & Time</Label>
                  <Input
                    id="new-date"
                    type="datetime-local"
                    value={newEvent.eventDate}
                    onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="new-location">Location</Label>
                  <Input
                    id="new-location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="Event location..."
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="new-description">Description</Label>
                <Textarea
                  id="new-description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={4}
                  placeholder="Enter event description..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="new-published"
                  checked={newEvent.isPublished}
                  onChange={(e) => setNewEvent({ ...newEvent, isPublished: e.target.checked })}
                />
                <Label htmlFor="new-published">Publish immediately</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => createMutation.mutate(newEvent)}
                  disabled={!newEvent.title.trim() || !newEvent.eventDate}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Create Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {events?.map((event: Event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    {editingEvent === event.id ? (
                      <Input
                        value={editForm.title || ""}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="text-xl font-bold"
                      />
                    ) : (
                      <CardTitle className="flex items-center gap-2">
                        {event.title}
                        <Badge variant={event.isPublished ? "default" : "secondary"}>
                          {event.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </CardTitle>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>📅 {format(new Date(event.eventDate), "PPP 'at' p")}</p>
                    <p>📍 {event.location}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {editingEvent === event.id ? (
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
                      <Button onClick={() => startEdit(event)} size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        onClick={() => deleteMutation.mutate(event.id)} 
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
              {editingEvent === event.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-date">Event Date & Time</Label>
                      <Input
                        id="edit-date"
                        type="datetime-local"
                        value={editForm.eventDate || ""}
                        onChange={(e) => setEditForm({ ...editForm, eventDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-location">Location</Label>
                      <Input
                        id="edit-location"
                        value={editForm.location || ""}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        placeholder="Event location..."
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={editForm.description || ""}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`published-${event.id}`}
                      checked={editForm.isPublished || false}
                      onChange={(e) => setEditForm({ ...editForm, isPublished: e.target.checked })}
                    />
                    <Label htmlFor={`published-${event.id}`}>Published</Label>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {event.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {(!events || events.length === 0) && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No events found. Click "New Event" to create your first event.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}