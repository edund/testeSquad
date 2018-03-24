<template lang="html">
    <div id="login">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 md6 offset-md3 class="text-xs-center">
                    <img src="../../assets/logo.png" />
                </v-flex>
                <v-flex xs12 md4 offset-md4>
                <form @submit.prevent="login">
                    <v-card color="light-blue lighten-2" class="elevation-8" hover>
                        <v-card-title primary-title>
                            <v-layout row wrap>
                                <v-flex sm4 xs12 md12 class="text-xs-center pb-4">
                                    <span  class="headline brown--text">Acesso ao sistema</span>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs12 md12 sm4>

                              <module-aviso :alert="aviso" class="pb-3" v-show="aviso.show"></module-aviso>
                                <v-text-field
                                  label="E-mail"
                                  type="email"
                                  v-model="user.username"
                                  required
                                  prepend-icon="person"
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                              <v-flex xs12 md12>
                                <v-text-field
                                  label="Senha"
                                  type="password"
                                  required
                                  v-model="user.password"
                                  prepend-icon="lock"
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex xs12 md4 sm4>
                                <v-btn type="submit" color="primary" :disabled="loading" :loading="loading">
                                    Entrar
                                    <span slot="loader" class="custom-loader">
                                        <v-icon light>cached</v-icon>
                                    </span>
                                </v-btn>
                              </v-flex>
                              <v-flex xs12 md8 class="text-xs-left" pt-3>
                                <p>
                                  <a @click="dialog = true"> Não consegue acessar sua conta?</a>
                                </p>
                              </v-flex>
                            </v-layout>
                        </v-card-title primary-title>
                        <v-card-actions>
                        </v-card-actions>
                    </v-card>
                    </form>
                </v-flex>
            </v-layout>
        </v-container>
        <v-dialog v-model="dialog" max-width="610px">
            <v-card>
                <v-card-title class="alterar-margin-baixo">
                    <v-flex xs9>
                        <v-subheader class="headline">Não consegue acessar sua conta?</v-subheader>
                    </v-flex>
                    <v-flex xs3 class="text-xs-right">
                        <v-btn color="primary" flat icon @click.stop="dialog=false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 class="text-xs-left">
                        <v-alert type="info" :value="true">
                            Se você não consegue acessar o SISTEMA, preencha este formulário e um email será enviado a
                            você com os detalhes para acessar sua conta novamente.
                        </v-alert>
                        <module-aviso :alert="aviso2" class="pb-3" v-show="aviso2.show"></module-aviso>
                    </v-flex>
                </v-card-title>
                <v-card-text>
                    <form @submit.prevent="esqueciSenha">
                        <v-card color="secondary" class="grey lighten-3" flat>
                            <v-card-text>
                                <v-container fluid grid-list-md>
                                    <v-layout row wrap>
                                        <v-flex xs7 sm8>
                                            <input type="hidden" />
                                            <v-text-field
                                                    label="E-mail"
                                                    :counter="170"
                                                    v-model="email"
                                                    type="email"
                                                    single-line
                                                    maxlength="170"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 sm2 offset-sm1 mt-3>
                                            <v-btn type="submit" color="primary" :disabled="loading" :loading="loading">
                                                Enviar
                                                <span slot="loader" class="custom-loader">
                                                    <v-icon light>cached</v-icon>
                                                </span>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </form>
                </v-card-text>
                <v-card-actions>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'login',
  data: function () {
    return {
      user: {},
      aviso: {},
      aviso2: {},
      loading: false,
      dialog: false,
      email: ''
    }
  },
  methods: {
    login: function () {
      this.loading = true
      let data = {
        grant_type: 'password',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        username: this.user.username,
        password: this.user.password,
        scope: ''
      }

      Vue.http.post('oauth/token', data).then(res => {
        localStorage['token'] = JSON.stringify(res.body)
        this.$store.dispatch('getUsuarioUser')
        this.loading = false
        this.$router.push('/dashboard')
      }).catch(error => {
        if (error.body.error === 'invalid_credentials') {
          this.aviso = {
            tipo: 'error',
            icon: 'warning',
            show: true,
            mensagem: 'Usuário ou senha inválidos!'
          }
        }
        this.loading = false
      })
    },
    esqueciSenha: function () {
      let data = {
        id: 1,
        email: this.email
      }
      this.$store.dispatch('esqueciSenha', data)
      setTimeout(() => {
        if (this.$store.state.perfil.esqueci_senha === '0') {
          this.aviso2 = {
            tipo: 'error',
            icon: 'warning',
            show: true,
            mensagem: 'Usuário não encontrado!'
          }
        } else {
          this.aviso2 = {
            tipo: 'success',
            icon: 'check_circle',
            show: true,
            mensagem: 'Sua senha foi alterada e enviada para seu e-mail!'
          }
        }
        this.email = ''
      }, 200)
    }
  }
}
</script>

<style lang="css">
    #login {
        background-image: url('../../assets/bg-login.png') !important;
        min-height: 100% !important;
        background-repeat: no-repeat !important;
        background-position: center center !important;
        background-attachment: fixed !important;
        background-color: #ffffff !important;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 99999;
        padding: 20px;
    }
</style>