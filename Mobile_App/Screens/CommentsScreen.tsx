import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const CommentsScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{post.user}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
      </View>

      <FlatList
        data={post.comments}
        keyExtractor={item => item.id}
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
    </View>
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
});

export default CommentsScreen;