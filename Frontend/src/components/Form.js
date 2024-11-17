import React from "react";
import { TextField, Box, Chip, Button } from "@mui/material";

const Form = ({
  isEditMode = false,
  formData,
  setFormData,
  handleSubmit,
  handleDeleteTag,
  handleAddTag,
  handleClose,
}) => {
  const { title, content, tags, tagInput } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-[91vh]">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isEditMode ? "Edit Blog Post" : "Create a New Blog Post"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-4">
            <TextField
              label="Title"
              name="title"
              value={title || ""}
              onChange={handleInputChange}
              fullWidth
              required
              variant="outlined"
            />
          </div>

          {/* Content Field */}
          <div className="mb-4">
            <TextField
              label="Content"
              name="content"
              value={content || ""}
              onChange={handleInputChange}
              fullWidth
              required
              multiline
              rows={4}
              variant="outlined"
            />
          </div>

          {/* Tags Field */}
          <div className="mb-4">
            <TextField
              label="Add Tags"
              name="tagInput"
              value={tagInput || ""}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  handleAddTag(e);
                }
              }}
              fullWidth
              variant="outlined"
              placeholder="Press Enter or ',' to add tags"
            />
            <Box className="mt-2 flex flex-wrap gap-2">
              {tags &&
                tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    color="primary"
                  />
                ))}
            </Box>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            {isEditMode && (
              <Button
                variant="outlined"
                onClick={handleClose}
                color="secondary"
              >
                Cancel
              </Button>
            )}
            <Button type="submit" variant="contained" color="primary">
              {isEditMode ? "Save Changes" : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
