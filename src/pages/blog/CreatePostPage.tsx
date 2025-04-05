
import BlogForm from '@/components/Blog/BlogForm';

const CreatePostPage = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <BlogForm mode="create" />
    </div>
  );
};

export default CreatePostPage;
