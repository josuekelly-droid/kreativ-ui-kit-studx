"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  type: string;
  userId: string;
  user: {
    name: string;
    email: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
  createdAt: string;
  likedByUser?: boolean;
}

export default function CommunityPage() {
  const { isSignedIn, user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", type: "share" });
  const [submitting, setSubmitting] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/community/posts?type=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const handleLike = async (postId: string) => {
    if (!isSignedIn) {
      alert("Connectez-vous pour liker");
      return;
    }
    try {
      const res = await fetch("/api/community/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      if (res.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      alert("Connectez-vous pour publier");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (res.ok) {
        setNewPost({ title: "", content: "", type: "share" });
        setShowCreateForm(false);
        fetchPosts();
      } else {
        alert("Erreur lors de la création");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!isSignedIn) {
      alert("Connectez-vous pour commenter");
      return;
    }
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await fetch("/api/community/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content: newComment }),
      });
      if (res.ok) {
        setNewComment("");
        fetchPosts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'share': return '📤';
      case 'tutorial': return '🎓';
      case 'question': return '❓';
      default: return '📄';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'share': return 'Partage';
      case 'tutorial': return 'Tutoriel';
      case 'question': return 'Question';
      default: return 'Post';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 py-16 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">👥 Communauté</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Partagez vos créations, posez des questions et inspirez-vous des autres.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Barre d'actions */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                filter === "all" ? "bg-purple-600 text-white" : "bg-white text-gray-600 hover:bg-purple-100"
              }`}
            >
              📰 Tous
            </button>
            <button
              onClick={() => setFilter("share")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                filter === "share" ? "bg-purple-600 text-white" : "bg-white text-gray-600 hover:bg-purple-100"
              }`}
            >
              📤 Partages
            </button>
            <button
              onClick={() => setFilter("tutorial")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                filter === "tutorial" ? "bg-purple-600 text-white" : "bg-white text-gray-600 hover:bg-purple-100"
              }`}
            >
              🎓 Tutoriels
            </button>
            <button
              onClick={() => setFilter("question")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                filter === "question" ? "bg-purple-600 text-white" : "bg-white text-gray-600 hover:bg-purple-100"
              }`}
            >
              ❓ Questions
            </button>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-5 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            + Nouvelle publication
          </button>
        </div>

        {/* Formulaire de création */}
        {showCreateForm && (
          <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">📝 Créer une publication</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <input
                type="text"
                placeholder="Titre"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={newPost.type}
                onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="share">📤 Partage</option>
                <option value="tutorial">🎓 Tutoriel</option>
                <option value="question">❓ Question</option>
              </select>
              <textarea
                placeholder="Contenu de votre publication..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                required
                rows={5}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {submitting ? "Publication..." : "Publier"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des posts */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Chargement...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 mb-4">Aucune publication pour le moment.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="text-purple-600 font-semibold hover:underline"
            >
              Soyez le premier à publier !
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-6">
                  {/* En-tête */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getTypeIcon(post.type)}</span>
                      <span className="text-sm font-semibold text-purple-600">
                        {getTypeLabel(post.type)}
                      </span>
                      <span className="text-xs text-gray-400">
                        • {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      👤 {post.user?.name || post.user?.email?.split("@")[0] || "Utilisateur"}
                    </span>
                  </div>

                  {/* Titre et contenu */}
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.content}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-6 border-t pt-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 transition ${
                        post.likedByUser ? "text-red-500" : "text-gray-500 hover:text-red-500"
                      }`}
                    >
                      ❤️ {post._count.likes}
                    </button>
                    <button
                      onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                      className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition"
                    >
                      💬 {post._count.comments} commentaire{post._count.comments !== 1 ? 's' : ''}
                    </button>
                  </div>

                  {/* Section commentaires */}
                  {expandedPostId === post.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          placeholder="Ajouter un commentaire..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="flex-1 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={submittingComment}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-50"
                        >
                          {submittingComment ? "..." : "Envoyer"}
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 text-center">
                        Les commentaires seront bientôt disponibles.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}