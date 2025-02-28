import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Post {
  id: string;
  userId: string;
  user: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  avatar: string;
}

interface Comment {
  id: string;
  user: string;
  text: string;
}

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: 'user1',
      user: 'Farmer123',
      content: 'Anyone experiencing leaf curl in citrus plants?',
      image: 'https://picsum.photos/400/300',
      likes: 12,
      comments: [
        { id: 'c1', user: 'AgriExpert', text: 'This could be citrus canker' },
        { id: 'c2', user: 'FarmerRaj', text: 'Try neem oil spray' }
      ],
      avatar: 'https://picsum.photos/200',
    },
    {
      id: '2',
      userId: 'user2',
      user: 'AgriExpert',
      content: 'New organic pesticide working great!',
      image: 'https://picsum.photos/401/300',
      likes: 25,
      comments: [],
      avatar: 'https://picsum.photos/201',
    },
  ]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [commentText, setCommentText] = useState('');

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const increment = likedPosts.has(postId) ? -1 : 1;
          return { ...post, likes: post.likes + increment };
        }
        return post;
      })
    );
    
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now().toString(),
                user: 'CurrentUser',
                text: commentText
              }
            ]
          };
        }
        return post;
      })
    );
    setCommentText('');
  };

  const handleViewComments = (post: Post) => {
    navigation.navigate('Comments', { post });
  };

  const handleViewProfile = (userId: string) => {
    navigation.navigate('Profile', { 
      userId,
      isEditable: false 
    });
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity 
        style={styles.postHeader}
        onPress={() => handleViewProfile(item.userId)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.user}</Text>
          <Text style={styles.userBadge}>Verified Farmer</Text>
        </View>
      </TouchableOpacity>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      {item.image && (
        <Image 
          source={{ uri: item.image }} 
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.postFooter}>
        <TouchableOpacity 
          style={styles.interactionButton}
          onPress={() => handleLike(item.id)}
        >
          <Icon 
            name={likedPosts.has(item.id) ? "thumb-up" : "thumb-up-outline"} 
            size={20} 
            color={likedPosts.has(item.id) ? "#4CAF50" : "#666"} 
          />
          <Text style={[
            styles.interactionText,
            { color: likedPosts.has(item.id) ? "#4CAF50" : "#666" }
          ]}>
            {item.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.interactionButton}
          onPress={() => handleViewComments(item)}
        >
          <Icon name="comment-outline" size={20} color="#666" />
          <Text style={styles.interactionText}>{item.comments.length}</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.commentInputContainer}
      >
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity 
          style={styles.commentButton}
          onPress={() => handleAddComment(item.id)}
        >
          <Text style={styles.commentButtonText}>Post</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Discussions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { 
          userId: 'currentUser',
          isEditable: true 
        })}>
          <Icon name="account-circle" size={32} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 16,
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flexDirection: 'column',
  },
  username: {
    fontWeight: 'bold',
    color: '#333',
  },
  userBadge: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  postContent: {
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  interactionText: {
    marginLeft: 8,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  commentButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommunityScreen;