import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CommentsScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');

  // Function to add comment
  const addComment = () => {
    if (!newComment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }

    const commentObject = {
      id: Date.now().toString(),
      user: 'Current User',  // Or get actual logged in user
      text: newComment.trim(),
    };

    const updatedComments = [...comments, commentObject];
    setComments(updatedComments);
    setNewComment('');

    // Update post with new comments and pass back to CommunityScreen
    navigation.setParams({ post: { ...post, comments: updatedComments } });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{post.user}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Icon name="account-circle" size={24} color="#4CAF50" />
            <View style={styles.commentText}>
              <Text style={styles.commentUser}>{item.user}</Text>
              <Text>{item.text}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noComments}>No comments yet</Text>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={addComment}>
          <Icon name="send" size={28} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontWeight: 'bold',
  },
  postContent: {
    color: '#666',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  commentText: {
    marginLeft: 12,
    flex: 1,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  noComments: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  addButton: {
    marginLeft: 12,
  },
});

export default CommentsScreen;
