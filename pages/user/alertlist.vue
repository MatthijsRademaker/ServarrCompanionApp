<script setup lang="ts">
import { useGetApiV1Book } from '~/thirdPartyApis/readarr';
import {
  getAlertList,
  removeFromAlertList,
} from '~/thirdPartyApis/supabase/alert-list';
const user = useSupabaseUser();

if (!user.value) {
  useRouter().push('/login');
}
const { data, error } = await getAlertList(user.value!.id);

const { data: books, isLoading: isLoadingBooks } = useGetApiV1Book(
  { bookIds: data?.map((item) => item.book_id) },
  {
    query: {
      enabled: !!data,
    },
  }
);
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Alert list</v-card-title>
          <v-card-text>
            <v-table class="mb-4">
              <thead>
                <tr>
                  <th class="text-left">Title</th>
                  <th class="text-left">Author</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="mb-4">
                <tr v-for="item in books" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.author?.authorName }}</td>
                  <td class="d-flex justify-end mb-2">
                    <v-btn
                      class="mt-2 mb-2"
                      icon
                      color="primary"
                      @click="removeFromAlertList(user!.id, item.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
