import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface StaffMember {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
}

export default function StaffManagement() {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingStaff, setEditingStaff] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<StaffMember>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    imageUrl: "",
    isActive: true,
    order: 0,
  });

  const { data: staff = [], isLoading } = useQuery<StaffMember[]>({
    queryKey: ["/api/staff"],
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof newStaff) => {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create staff member");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      setIsDialogOpen(false);
      setNewStaff({
        name: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        imageUrl: "",
        isActive: true,
        order: 0,
      });
      toast({
        title: "Success",
        description: "Staff member created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create staff member",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: number; updates: Partial<StaffMember> }) => {
      const response = await fetch(`/api/staff/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.updates),
      });
      if (!response.ok) throw new Error("Failed to update staff member");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      setEditingStaff(null);
      setEditForm({});
      toast({
        title: "Success",
        description: "Staff member updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update staff member",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/staff/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete staff member");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({
        title: "Success",
        description: "Staff member deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete staff member",
        variant: "destructive",
      });
    },
  });

  const startEdit = (member: StaffMember) => {
    setEditingStaff(member.id);
    setEditForm({ ...member });
  };

  const saveEdit = () => {
    if (editingStaff) {
      updateMutation.mutate({
        id: editingStaff,
        updates: editForm,
      });
    }
  };

  const cancelEdit = () => {
    setEditingStaff(null);
    setEditForm({});
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading staff members...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Management</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage staff directory, contact information, and department assignments
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-name">Name</Label>
                <Input
                  id="new-name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label htmlFor="new-position">Position</Label>
                <Input
                  id="new-position"
                  value={newStaff.position}
                  onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div>
                <Label htmlFor="new-department">Department</Label>
                <Input
                  id="new-department"
                  value={newStaff.department}
                  onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                  placeholder="Department"
                />
              </div>
              <div>
                <Label htmlFor="new-email">Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="Email address"
                />
              </div>
              <div>
                <Label htmlFor="new-phone">Phone</Label>
                <Input
                  id="new-phone"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="new-order">Display Order</Label>
                <Input
                  id="new-order"
                  type="number"
                  value={newStaff.order}
                  onChange={(e) => setNewStaff({ ...newStaff, order: parseInt(e.target.value) || 0 })}
                  placeholder="Order (lower numbers first)"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="new-image">Image URL</Label>
                <Input
                  id="new-image"
                  value={newStaff.imageUrl}
                  onChange={(e) => setNewStaff({ ...newStaff, imageUrl: e.target.value })}
                  placeholder="Profile image URL"
                />
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="new-active"
                    checked={newStaff.isActive}
                    onChange={(e) => setNewStaff({ ...newStaff, isActive: e.target.checked })}
                  />
                  <Label htmlFor="new-active">Active (visible on website)</Label>
                </div>
              </div>
              <div className="col-span-2 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => createMutation.mutate(newStaff)}
                  disabled={!newStaff.name.trim() || !newStaff.position.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Add Staff Member
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staff?.map((member: StaffMember) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.position}</p>
                  </div>
                </div>
                <Badge variant={member.isActive ? "default" : "secondary"}>
                  {member.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {editingStaff === member.id ? (
                <div className="space-y-3">
                  <Input
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Name"
                  />
                  <Input
                    value={editForm.position || ""}
                    onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                    placeholder="Position"
                  />
                  <Input
                    value={editForm.department || ""}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    placeholder="Department"
                  />
                  <Input
                    value={editForm.email || ""}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="Email"
                  />
                  <Input
                    value={editForm.phone || ""}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="Phone"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`active-${member.id}`}
                      checked={editForm.isActive || false}
                      onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                    />
                    <Label htmlFor={`active-${member.id}`}>Active</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={saveEdit} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={cancelEdit} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p><strong>Department:</strong> {member.department}</p>
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>Phone:</strong> {member.phone}</p>
                  <p><strong>Order:</strong> {member.order}</p>
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={() => startEdit(member)} size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      onClick={() => deleteMutation.mutate(member.id)} 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {(!staff || staff.length === 0) && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No staff members found. Click "Add Staff Member" to create the first profile.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}